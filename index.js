const cors = require('cors');
const express = require('express');
require('./db')
const bodyParser = require('body-parser');
const Student = require('./modules/student');
const StudentSignup = require('./modules/accountcreation');
const jwt = require('jsonwebtoken');
const User = require('./modules/user');
const bcrypt = require('bcrypt');
const Teachers = require('./teachersmodules/teachers');
const Standard = require('./modules/standardmodule/standardmodule');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

//read
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//create
app.post('/students', async (req, res) => {
    const { studentId, firstName, lastName, age, email, standard } = req.body;
    const newstudent = new Student({ studentId, firstName, lastName, age, email, standard });

    try {
        await newstudent.save();
        res.status(201).json(newstudent);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//update
app.put('/students/:id', async (req, res) => {
    const studentId = req.params.id;
    const { firstName, lastName, age, email, standard } = req.body;
    try {
        const student = await Student.findByIdAndUpdate(studentId);
        if (!student) {
            return res.status(404).json({ error: 'student not found' });
        }
        student.firstName = firstName;
        student.lastName = lastName;
        student.age = age;
        student.email = email;
        student.standard = standard;
        await student.save();
        res.json(student);
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//findbyunique id
app.get("/students/:id", async (req, res) => {
    const studentId = req.params.id;
    try {
        const studentDetailsFindById = await Student.findById(studentId);
        if (!studentDetailsFindById) {
            return res.status(404).json({ error: 'student not found' });
        }
        res.status(200).json(studentDetailsFindById);
    } catch (error) {
        res.status(500).json("Internal Server Error");
    }
});


//delete
app.delete("/students/:id", async (req, res) => {
    const studentId = req.params.id;
    try {
        const deleteStudent = await Student.findByIdAndDelete(studentId);
        if (!deleteStudent) {
            return res.status(404).json({ error: 'student not found' });
        }
        res.status(202).json("Student Deleted Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal Server Error");
    }
});

//signup
app.post('/students/signup', async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingStudent = await StudentSignup.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({ message: 'Student Alredy Exist' });
        }
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newStudent = new StudentSignup({ email, password: hashedPassword });
        console.log(hashedPassword, 'pass');
        await newStudent.save();

        res.status(201).json({ message: 'Student Created Successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

//login
app.post('/students/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ email: user.email }, '987654');

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// teachers //
//read
app.get('/teachers', async (req, res) => {
    try {
        const teachers = await Teachers.find();
        res.json(teachers)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//create
app.post('/teachers', async (req, res) => {
    try {
        const { teachersId, firstName, lastName, age, email, standard } = req.body
        const newTeachers = new Teachers({ teachersId, firstName, lastName, age, email, standard });
        await newTeachers.save();
        res.status(201).json(newTeachers);
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal Server Error');
    }
});

//update

app.put('/teachers/:id', async (req, res) => {
    const teachersId = req.params.id;
    const { firstName, lastName, age, email, standard } = req.body;
    try {
        const teacher = await Teachers.findByIdAndUpdate(teachersId);
        if (!teacher) {
            return res.status(404).json({ error: 'teacher not found' });
        }
        teacher.firstName = firstName;
        teacher.lastName = lastName;
        teacher.age = age;
        teacher.email = email;
        teacher.standard = standard;
        await teacher.save();
        res.json(teacher);
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal Server Error');
    }
});

//findbyuniqueid 
app.get("/teachers/:id", async (req, res) => {
    const teachersId = req.params.id;
    try {
        const teacherDetailsFindById = await Teachers.findById(teachersId);
        if (!teacherDetailsFindById) {
            return res.status(404).json({ error: 'teacher not found' });
        }
        res.status(200).json(teacherDetailsFindById);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
})

//teacherDelete

app.delete("/teachers/:id", async (req, res) => {
    const teachersId = req.params.id;
    try {
        const teacher = await Teachers.findByIdAndDelete(teachersId);
        if (!teacher) {
            res.status(404).json({ error: 'Teacher is Not Found' });
        }
        res.status(202).json("Student Deleted Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')
    }
})

//standrd
//read
app.get('/standard', async (req, res) => {
    try {
        const standard = await Standard.find();
        res.json(standard)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

//create
app.post('/standard', async (req, res) => {
    try {
        const { standard } = req.body
        const newStandard = new Standard({ standard });
        await newStandard.save();
        res.status(201).json(newStandard);
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal Server Error');
    }
});

//update

app.put('/standard/:id', async (req, res) => {
    const standardId = req.params.id;
    const { standard } = req.body;
    try {
        const standardData = await Standard.findByIdAndUpdate(standardId);
        if (!standardData) {
            return res.status(404).json({ error: 'standard not found' });
        }
        standardData.standard = standard;
        await standardData.save();
        res.json(standardData);
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal Server Error');
    }
});

//findbyuniqueid 
app.get("/standard/:id", async (req, res) => {
    const standardId = req.params.id;
    try {
        const standardDetailsFindById = await Standard.findById(standardId);
        if (!standardDetailsFindById) {
            return res.status(404).json({ error: 'standard not found' });
        }
        res.status(200).json(standardDetailsFindById);
    } catch (error) {
        res.status(500).json('Internal Server Error');
    }
})

//standardDelete

app.delete("/standard/:id", async (req, res) => {
    const standardId = req.params.id;
    try {
        const standard = await Standard.findByIdAndDelete(standardId);
        if (!standard) {
            res.status(404).json({ error: 'standard is Not Found' });
        }
        res.status(202).json("standard Deleted Successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal server error')
    }
})



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
