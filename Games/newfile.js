import java.sql.*;  
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Scanner;

/*
 
 javac GameApp.java
 
 java -cp /home/codio/workspace/mysql-java-game-copy/mysql-connector-java-8.0.13.jar:.: GameApp

*/

     
public class GameApp {  
    
    static Connection con;
    static Scanner sc;
    public static void main(String args[]){  
    
            sc = new Scanner(System.in);
            int option=6;
   
            try{  
  
                con=DriverManager.getConnection("jdbc:mysql://localhost/game?user=root");  
 
                Class.forName("com.mysql.cj.jdbc.Driver");  
 
                while (option != 5) {
      
    
                 System.out.println();
                 System.out.println("1. Add a player");
                 System.out.println("2. Find a player by PlayerId");
                 System.out.println("3. Find a Game by GameId");
                 System.out.println("4. Show all Players");
                 System.out.println("5. Exit");
                 System.out.println("6. Show the Game Type");
                 System.out.println("7. Play Game(1) RPSLS Game");
                 System.out.println("8. Play Game(2) Snake Game");
                 System.out.println("9. Play Game(3) Adventure Game");
                 System.out.println("10. Show the Products");
                 System.out.println("11. Show the Discounts");
     
                 System.out.print("\nChoice : ");
        
                  option = sc.nextInt(); 
     
                 switch(option) {

                    case 1: addplayer();
                    break;

                     case 2: findbyid();
                     break;

                     case 3: findbygameid();
                    break;

                     case 4: findall();
                     break;             

                     case 6: showgametypes();
                     break;
                 
                    case 7: playgame1();
                     break;

                     case 8: playgame2();
                     break;

                     case 9: playgame3();
                     break;

                     case 10: showProducts();
                     break;

                     case 11: showDiscounts();
                     break;
                 
                 
                 }
                        
                 }
                
            con.close();
        
            }catch(Exception e){ System.out.println(e);}
      }
    
public static void findall() {
    try{ 
        Statement stmt=con.createStatement();  
        ResultSet rs=stmt.executeQuery("select * from PlayerInfo");  
    
        while(rs.next()) {
        
            System.out.print(rs.getString("PlayerId") + " ");
            System.out.print(rs.getString("FirstName") + " ");
            System.out.print(rs.getString("LastName") + " ");
            System.out.println(rs.getString("userName"));
    
        }
    
          
    }catch(Exception e){ System.out.println(e);}
    
  }  

  public static void addplayer() {
    try {
        System.out.print("Enter First Name: ");
        String firstName = sc.next();

        System.out.print("Enter Last Name: ");
        String lastName = sc.next();

        System.out.print("Enter User Name: ");
        String userName = sc.next();

        // Establish connection
        Connection con = DriverManager.getConnection("jdbc:mysql://localhost/game?user=root");

        // Prepare the SQL statement for insertion
        PreparedStatement stmt = con.prepareStatement("INSERT INTO PlayerInfo (FirstName, LastName, userName) VALUES (?, ?, ?)");

        // Set values for placeholders in the SQL statement
        stmt.setString(1, firstName);
        stmt.setString(2, lastName);
        stmt.setString(3, userName);

        // Execute the update (insert) statement
        int rowsAffected = stmt.executeUpdate();

        if (rowsAffected > 0) {
            System.out.println("Player added successfully!");
        } else {
            System.out.println("Failed to add player.");
        }

        // Close resources
        stmt.close();
        con.close();

    } catch (Exception e) {
        System.out.println(e);
    }
}

    
public static void findbyid() {
      
    System.out.print("Enter PlayerId: ");
    int playerId = sc.nextInt();
      
    try {
          
        PreparedStatement stmt = con.prepareStatement("select * from PlayerInfo where playerId = ?");   
        stmt.setInt(1, playerId);  // Corrected variable name to playerId
        
        ResultSet rs = stmt.executeQuery();  
    
        while (rs.next()) {
        
            System.out.print(rs.getString("PlayerId") + " "); // Corrected column name to "PlayerId"
            System.out.print(rs.getString("FirstName") + " ");
            System.out.print(rs.getString("LastName") + " ");
            System.out.print(rs.getString("userName"));
        }
    
    } catch(Exception e) {
        System.out.println(e);
    }
} 

public static void findbygameid() {
    try {
        System.out.print("Enter GameId: ");
        int gameId = sc.nextInt();

        // Establish connection
        Connection con = DriverManager.getConnection("jdbc:mysql://localhost/game?user=root");

        // Prepare the SQL statement for selection
        PreparedStatement stmt = con.prepareStatement("SELECT * FROM GameType WHERE gameId = ?");
        stmt.setInt(1, gameId);

        // Execute the query
        ResultSet rs = stmt.executeQuery();

        // Check if any results are found
        if (rs.next()) {
            System.out.println("Game(s) with gameId '" + gameId + "':");
            do {
                System.out.print(rs.getString("gameId") + " ");
                System.out.print(rs.getString("gameName") + " ");
                System.out.print(rs.getString("highestScore") + " ");
                System.out.print(rs.getString("playerId"));
                System.out.println();
            } while (rs.next());
        } else {
            System.out.println("No game found with the gameId '" + gameId + "'.");
        }

        // Close resources
        rs.close();
        stmt.close();
        con.close();

    } catch (Exception e) {
        System.out.println(e);
    }
}

public static void showgametypes() {
    try {
        // Establish connection
        Connection con = DriverManager.getConnection("jdbc:mysql://localhost/game?user=root");

        // Prepare the SQL statement for selection
        PreparedStatement stmt = con.prepareStatement("SELECT * FROM GameType");
        
        // Execute the query
        ResultSet rs = stmt.executeQuery();

        // Display the Game Type
        System.out.println("Game Type:");
        System.out.printf("%-10s %-20s %-10s %-10s%n", "GameId", "GameName", "HighestScore", "PlayerId");
        System.out.println("-------------------------------------------------------------");

        while (rs.next()) {
            System.out.printf("%-10d %-20s %-10d %-10d%n",
                    rs.getInt("gameId"),
                    rs.getString("gameName"),
                    rs.getInt("highestScore"),
                    rs.getInt("playerId"));
        }

        // Close resources
        rs.close();
        stmt.close();
        con.close();

    } catch (Exception e) {
        System.out.println(e);
    }
}


public static void playgame1() {
        System.out.println("CLICK LIMK TO PLAY ROCK, PAPER, SCISSORS, LIZARD, SPOCK!");
        System.out.println("https://melodyeast-colombolondon.codio.io/rps/index.html");
    }
    public static void playgame2() {
        System.out.println("CLICK LIMK TO PLAY SNAKE!");
        System.out.println("https://melodyeast-colombolondon.codio.io/snake/index.html");
    }
    public static void playgame3() {
        System.out.println("CLICK LIMK TO PLAY THE ADVENTURE GAME!");
        System.out.println("...coming soon..");
    }

   public static void showProducts() {
        try {
            // Establish connection
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost/game?user=root")) {

                // Prepare the SQL statement for selection
                try (PreparedStatement stmt = con.prepareStatement("SELECT * FROM Product")) {

                    // Execute the query
                    try (ResultSet rs = stmt.executeQuery()) {

                        // Display the Product table
                        System.out.println("Product Table:");
                        System.out.printf("%-10s %-20s %-15s %-15s%n", "ProductID", "ProductName", "ProductAmount", "ProductPrice");
                        System.out.println("-------------------------------------------------------------");

                        while (rs.next()) {
                            System.out.printf("%-10d %-20s %-15d %-15d%n",
                                    rs.getInt("productId"),
                                    rs.getString("productName"),
                                    rs.getInt("productAmount"),
                                    rs.getInt("productPrice"));
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }
   public static void showDiscounts() {
        try {
            // Establish connection
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost/game?user=root")) {

                // Prepare the SQL statement for selection
                try (PreparedStatement stmt = con.prepareStatement("SELECT * FROM Discount")) {

                    // Execute the query
                    try (ResultSet rs = stmt.executeQuery()) {

                        // Display the Product table
                        System.out.println("Discount Table:");
                        System.out.printf("%-10s %-20s %-15s %-15s%n", "DiscountID", "DiscountName", "DiscountAmount", "DiscountPrice");
                        System.out.println("-------------------------------------------------------------");

                        while (rs.next()) {
                            System.out.printf("%-10d %-20s %-15d %-15d%n",
                                    rs.getInt("discountId"),
                                    rs.getString("discountName"),
                                    rs.getInt("discountAmount"),
                                    rs.getInt("discountPrice"));
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.out.println(e);
        }
    }

}
