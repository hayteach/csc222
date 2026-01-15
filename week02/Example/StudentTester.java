import java.util.Scanner;
public class StudentTester 
{
    public static void main(String[] args) 
    {
        Scanner kb = new Scanner(System.in);

        Student student1 = new Student();
        student1.setName("George Washington");
        System.out.println("\n***** Student 1 information *****");
        student1.printStudent();

        Student student2 = new Student("Betty White");
        System.out.println("\n***** Student 2 information *****");
        student2.printStudent(); 
       
        Student student3 = new Student("Jimmy Jones", "sid01");
        System.out.println("\n***** Student 3 information *****");
        student3.printStudent();

        Student student4 = new Student("Janis Joplin", "sid003", "csc");
        student4.setGpa(3.3);
        
        System.out.println("\n***** Student 4 information *****");
        student4.printStudent();

        kb.close();
        System.exit(0);
    }


}