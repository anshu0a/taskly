import java.util.Scanner;

public class User{
    public static void main(String [] args){

        Profile p1 = new Profile();
        Linkedin.createprofile(p1);
        System.out.println("_____________________________________________________________");
        System.out.println(Linkedin.showProfile(p1));
        
        System.out.println("_____________________________________________________________"); 

        Profile p2 = new Profile();
        Linkedin.createprofile(p2);
        System.out.println("_____________________________________________________________");
        System.out.println(Linkedin.showProfile(p2));
        System.out.println("_____________________________________________________________");
        p2.addConnection(p1);
        System.out.println(Linkedin.showProfile(p1));




    }

}
class Linkedin{
    static Scanner sc = new Scanner(System.in);
    public static String createprofile(Profile prf){
        System.out.print("Enter your name : ");
        String name = sc.nextLine();
        prf.name = name;
        System.out.print("Enter your designation : ");
        prf.designation = sc.nextLine();
        System.out.print("Enter your web page : ");
        prf.page = sc.nextLine();
        Address adr = new Address();
        System.out.print("Enter your street name : ");
        adr.streetName = sc.nextLine();
        System.out.print("Enter your State name : ");
        adr.state = sc.nextLine();
        System.out.print("Enter your country name : ");
        adr.country = sc.nextLine();
        System.out.print("Enter your university name : ");
        prf.universityName = sc.nextLine();

        prf.address = adr;

        return (name + "'s account created.");

    }
    public static String showProfile(Profile prf){
        return "Name : "+prf.name +
               "\nDegination : "+prf.designation +
               "\nWeb page : "+ prf.page +
               "\nStreetName : "+ prf.address.streetName +
               "\nState : "+ prf.address.state + 
               "\nCountry : "+prf.address.country+
               "\nConnections : "+ prf.connection + 
               "\nUniversity Name : "+prf.universityName;
    }


}
class Profile{
public String name;
public String designation;
public String page;
public Address address;
public int connection;
public String universityName;

public void addConnection(Profile prf){
    prf.connection++;
}
}
class Address{
public String streetName;
public String country;
public String state;
}
