class Student
{
    // Attributes
    private String name;
    private String studentID;
    private String major;
    private double gpa;

    //public - directly available within and outside of this class
    //private - only accessable within this class
    //protected - available within the class and its subclasses

    // Constructors
    // Default constructor
    Student()
    {
        name = "no name";
        studentID = "not assigned";
        major = "undeclared";
        gpa = 0.0;
    }
    Student(String aName)
    {
        name = aName;
        studentID = "not assigned";
        major = "undeclared";
        gpa = 0.0;
    }
    Student(String aName, String sid)
    {
        name = aName;
        studentID = sid;
        major = "undeclared";
        gpa = 0.0;
    }
    Student(String aName, String sid, String aMajor)
    {
        name = aName;
        studentID = sid;
        major = aMajor;
        gpa = 0.0;
    }

    // Methods

    // Accessor methods OR "get" methods
    public String getName()
    {
        return name;
    }
    public String getStudentID()
    {
        return studentID;
    }
    public String getMajor()
    {
        return major;
    }
    public double getGpa()
    {
        return gpa;
    }

    // Mutator methods OR "set" methods
    public void setName(String newName)
    {
        name = newName;
    }

    public void setStudentID(String newID)
    {
        studentID = newID;
    }
    public void setMajor(String newMajor)
    {
        major = newMajor;
    }
    public void setGpa(Double aGpa)
    {
        gpa = aGpa;
    }

    // Actual Action Methods
    public void printStudent()
    {
        System.out.println("Student: " + name);
        System.out.println("Student ID: " + studentID);
        System.out.println("Major: " + major);
        System.out.println("GPA: " + gpa);
        
    }
}