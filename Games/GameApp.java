import java.sql.*;  
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Scanner;

/*
 
 javac GameApp.java
 
 java -cp /home/codio/workspace/ABC_Database/Games/mysql-java-game-copy/mysql-connector-java-8.0.13.jar:.: GameApp

*/

     
public class GameApp {  
    
    static Connection con;
    static Scanner sc;
    public static void main(String args[]){  
    
            sc = new Scanner(System.in);
            int option=6;
   
            try{  
  
                con=DriverManager.getConnection("jdbc:mysql://localhost/Game_Data?user=root");  
 
                Class.forName("com.mysql.cj.jdbc.Driver");  
 
                while (option != 5) {
      
    
                 System.out.println();
                 System.out.println("1. Create User");
                 System.out.println("2. Play A Game");
                 System.out.println("3. Settings");
                 System.out.println("4. Leaderboard");
                 System.out.println("5. Exit");
     
                 System.out.print("\nChoice : ");
        
                  option = sc.nextInt(); 
     
                 switch(option) {

                    case 1: addplayer();
                    break;

                     case 2: playGame();
                     break;

                     case 3: settings();
                    break;

                     case 4: showLeader();
                     break;             

                     case 5: exit();
                     break;
                
                 }
                        
                 }
                
            con.close();
        
            }catch(Exception e){ System.out.println(e);}
      }
    
public static void findall() {
    try{ 
        Statement stmt=con.createStatement();  
        ResultSet rs=stmt.executeQuery("select * from PLAYER_INFO");  
    
        while(rs.next()) {
        
            System.out.print(rs.getString("PlayerId") + " ");
            System.out.print(rs.getString("FirstName") + " ");
            System.out.print(rs.getString("LastName") + " ");
            System.out.println(rs.getString("UserName"));
    
        }

    
          
    }catch(Exception e){ System.out.println(e);}
    
  }  

  public static void exit(){
    
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
        Connection con = DriverManager.getConnection("jdbc:mysql://localhost/Game_Data?user=root");

        // Prepare the SQL statement for insertion
        PreparedStatement stmt = con.prepareStatement("INSERT INTO PLAYER_INFO (FirstName, LastName, userName) VALUES (?, ?, ?)");

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

public static void settings() {
    try {
        int settingOption = 0;

        while (settingOption != 4) {
            System.out.println("\nSettings Menu:");
            System.out.println("1. Change User Name");
            System.out.println("2. Delete User");
            System.out.println("3. Show All Users");
            System.out.println("4. Back to Main Menu");

            System.out.print("Enter option: ");
            settingOption = sc.nextInt();

            switch (settingOption) {
                case 1:
                    changeUserName();
                    break;
                case 2:
                    deleteUser();
                    break;
                case 3:
                    findall();
                    break;
                case 4:
                    System.out.println("Returning to the main menu...");
                    break;
                default:
                    System.out.println("Invalid option. Please try again.");
                    break;
            }
        }

    } catch (Exception e) {
        System.out.println(e);
    }
}

public static void changeUserName() {
    try {
        System.out.print("Enter First Name: ");
        String firstName = sc.next();

        System.out.print("Enter Last Name: ");
        String lastName = sc.next();

        System.out.print("Enter Current User Name: ");
        String currentUserName = sc.next();

        // Check if the record exists in the PLAYER_INFO table
        try (PreparedStatement stmt = con.prepareStatement("SELECT * FROM PLAYER_INFO WHERE FirstName = ? AND LastName = ? AND UserName = ?")) {
            stmt.setString(1, firstName);
            stmt.setString(2, lastName);
            stmt.setString(3, currentUserName);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    // Record found, prompt for the new user name
                    System.out.print("Enter New User Name: ");
                    String newUserName = sc.next();

                    // Update the record with the new user name
                    try (PreparedStatement updateStmt = con.prepareStatement("UPDATE PLAYER_INFO SET UserName = ? WHERE FirstName = ? AND LastName = ? AND UserName = ?")) {
                        updateStmt.setString(1, newUserName);
                        updateStmt.setString(2, firstName);
                        updateStmt.setString(3, lastName);
                        updateStmt.setString(4, currentUserName);

                        int rowsAffected = updateStmt.executeUpdate();

                        if (rowsAffected > 0) {
                            System.out.println("User name updated successfully!");
                        } else {
                            System.out.println("Failed to update user name.");
                        }
                    }
                } else {
                    System.out.println("User not found. Please check the entered details.");
                }
            }
        }

    } catch (Exception e) {
        System.out.println(e);
    }
}

public static void deleteUser() {
    try {
        // Get user input
        System.out.print("Enter First Name: ");
        String firstName = sc.next();

        System.out.print("Enter Last Name: ");
        String lastName = sc.next();

        System.out.print("Enter User Name: ");
        String userName = sc.next();

        // Establish connection
        Connection con = DriverManager.getConnection("jdbc:mysql://localhost/Game_Data?user=root");

        // Find the user by username
        PreparedStatement findUserStmt = con.prepareStatement("SELECT * FROM PLAYER_INFO WHERE FirstName = ? AND LastName = ? AND UserName = ?");
        findUserStmt.setString(1, firstName);
        findUserStmt.setString(2, lastName);
        findUserStmt.setString(3, userName);

        ResultSet rs = findUserStmt.executeQuery();

        if (rs.next()) {
            // Display user information
            System.out.println("User found:");
            System.out.println("PlayerId: " + rs.getInt("PlayerId"));
            System.out.println("FirstName: " + rs.getString("FirstName"));
            System.out.println("LastName: " + rs.getString("LastName"));
            System.out.println("UserName: " + rs.getString("UserName"));

            int playerId = rs.getInt("PlayerId");

            // Ask for confirmation
            System.out.print("Are you sure you want to delete " + userName + "? (yes/no): ");
            String confirmation = sc.next().toLowerCase();

            if (confirmation.equals("yes")) {
                // Delete records in dependent tables
                deleteRecordsFromTable(con, "SNAKE", "PlayerId", playerId);
                deleteRecordsFromTable(con, "RPSLS", "PlayerId", playerId);
                deleteRecordsFromTable(con, "1UPFROGGER", "PlayerId", playerId);
                deleteRecordsFromTable(con, "VENTURE", "PlayerId", playerId);

                // Delete the user in PLAYER_INFO table
                PreparedStatement deleteStmt = con.prepareStatement("DELETE FROM PLAYER_INFO WHERE PlayerId = ?");
                deleteStmt.setInt(1, playerId);
                int rowsAffected = deleteStmt.executeUpdate();

                if (rowsAffected > 0) {
                    System.out.println("User deleted successfully!");
                } else {
                    System.out.println("Failed to delete user.");
                }
            } else {
                System.out.println("Deletion canceled.");
            }
        } else {
            System.out.println("User not found.");
        }

        // Close resources
        rs.close();
        findUserStmt.close();
        con.close();

    } catch (Exception e) {
        System.out.println(e);
    }
}

private static void deleteRecordsFromTable(Connection con, String tableName, String column, int value) throws SQLException {
    PreparedStatement deleteRecordsStmt = con.prepareStatement("DELETE FROM " + tableName + " WHERE " + column + " = ?");
    deleteRecordsStmt.setInt(1, value);
    deleteRecordsStmt.executeUpdate();
}


public static void showLeader() {
    try {
        int settingOption = 0;

        while (settingOption != 6) {
            System.out.println("\nLeaderboards:");
            System.out.println("1. Snake");
            System.out.println("2. Frogger");
            System.out.println("3. RPSLS");
            System.out.println("4. Adventure");
            System.out.println("5. User Stats");
            System.out.println("6. Back to Main Menu");

            System.out.print("Enter option: ");
            settingOption = sc.nextInt();

            switch (settingOption) {
                case 1:
                    showSnake();
                    break;
                case 2:
                    showFrogger();
                    break;
                case 3:
                    showRPSLS();
                    break;
                case 4:
                    showAdventure();
                    break;
                case 5:
                    showStats();
                    break;
                case 6:
                    System.out.println("Returning to the main menu...");
                    break;
                default:
                    System.out.println("Invalid option. Please try again.");
                    break;
            }
        }

    } catch (Exception e) {
        System.out.println(e);
    }
}

public static void showSnake(){
    try {
            // Establish connection
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost/Game_Data?user=root")) {

                // Prepare the SQL statement for selection
                try (PreparedStatement stmt = con.prepareStatement("SELECT * FROM SNAKE")) {

                    // Execute the query
                    try (ResultSet rs = stmt.executeQuery()) {

                        // Display the Product table
                        System.out.println("Snake Leaderboard:");
                        System.out.printf("%-10s %-20s %-15s %-15s%n", "PlayerId", "Score", "Etime", "Deaths");
                        System.out.println("-------------------------------------------------------------");

                        while (rs.next()) {
                            System.out.printf("%-10d %-20d %-15s %-15d%n",
                                    rs.getInt("PlayerId"),
                                    rs.getInt("Score"),
                                    rs.getString("Etime"),
                                    rs.getInt("Deaths"));
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.out.println(e);
        }
}
public static void showFrogger(){
        try {
            // Establish connection
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost/Game_Data?user=root")) {

                // Prepare the SQL statement for selection
                try (PreparedStatement stmt = con.prepareStatement("SELECT * FROM 1UPFROGGER")) {

                    // Execute the query
                    try (ResultSet rs = stmt.executeQuery()) {

                        // Display the Product table
                        System.out.println("Snake Leaderboard:");
                        System.out.printf("%-10s %-20s %-15s %-15s%n", "PlayerId", "Score", "Etime", "Deaths");
                        System.out.println("-------------------------------------------------------------");

                        while (rs.next()) {
                            System.out.printf("%-10d %-20d %-15s %-15d%n",
                                    rs.getInt("PlayerId"),
                                    rs.getInt("Score"),
                                    rs.getString("Etime"),
                                    rs.getInt("Deaths"));
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.out.println(e);
        }
}
public static void showRPSLS(){
        try {
            // Establish connection
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost/Game_Data?user=root")) {

                // Prepare the SQL statement for selection
                try (PreparedStatement stmt = con.prepareStatement("SELECT * FROM RPSLS")) {

                    // Execute the query
                    try (ResultSet rs = stmt.executeQuery()) {

                        // Display the Product table
                        System.out.println("Snake Leaderboard:");
                        System.out.printf("%-10s %-20s %-15s %-15s%n", "PlayerId", "ScoreStreak", "Etime", "Deaths");
                        System.out.println("-------------------------------------------------------------");

                        while (rs.next()) {
                            System.out.printf("%-10d %-20d %-15s %-15d%n",
                                    rs.getInt("PlayerId"),
                                    rs.getInt("ScoreStreak"),
                                    rs.getString("Etime"),
                                    rs.getInt("Deaths"));
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.out.println(e);
        }
}
public static void showAdventure(){
        try {
            // Establish connection
            try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost/Game_Data?user=root")) {

                // Prepare the SQL statement for selection
                try (PreparedStatement stmt = con.prepareStatement("SELECT * FROM VENTURE")) {

                    // Execute the query
                    try (ResultSet rs = stmt.executeQuery()) {

                        // Display the Product table
                        System.out.println("Snake Leaderboard:");
                        System.out.printf("%-10s %-20s %-15s %-15s%n", "PlayerId", "NumInputs", "Etime", "Deaths");
                        System.out.println("-------------------------------------------------------------");

                        while (rs.next()) {
                            System.out.printf("%-10d %-20d %-15s %-15d%n",
                                    rs.getInt("PlayerId"),
                                    rs.getInt("NumInputs"),
                                    rs.getString("Etime"),
                                    rs.getInt("Deaths"));
                        }
                    }
                }
            }
        } catch (Exception e) {
            System.out.println(e);
        }
}
public static void showStats() {
    try {
        // Establish connection
        try (Connection con = DriverManager.getConnection("jdbc:mysql://localhost/Game_Data?user=root")) {

            // Prepare the SQL statement for selection
            try (PreparedStatement stmt = con.prepareStatement(
                    "SELECT " +
                            "PlayerId, " +
                            "SEC_TO_TIME(SUM(TotalSeconds)) AS TotalTimePlayed " +
                            "FROM ( " +
                            "SELECT PlayerId, TIME_TO_SEC(Etime) AS TotalSeconds FROM SNAKE " +
                            "UNION ALL " +
                            "SELECT PlayerId, TIME_TO_SEC(Etime) AS TotalSeconds FROM RPSLS " +
                            "UNION ALL " +
                            "SELECT PlayerId, TIME_TO_SEC(Etime) AS TotalSeconds FROM 1UPFROGGER " +
                            "UNION ALL " +
                            "SELECT PlayerId, TIME_TO_SEC(Etime) AS TotalSeconds FROM VENTURE " +
                            ") AS CombinedTables " +
                            "GROUP BY PlayerId;")) {

                // Execute the query
                try (ResultSet rs = stmt.executeQuery()) {

                    // Display the Product table
                    System.out.println("User Stats:");
                    System.out.printf("%-10s %-20s%n", "PlayerId", "TotalTimePlayed");
                    System.out.println("-------------------------------------------------------------");

                    while (rs.next()) {
                        System.out.printf("%-10d %-20s%n",
                                rs.getInt("PlayerId"),
                                rs.getString("TotalTimePlayed"));
                    }
                }
            }
        }
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

public static void Leaderboard() {
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


public static void playGame() {
        System.out.println("CLICK LINK TO LAUNCH GAME MENU");
        System.out.println("https://amberyear-harrispedro.codio.io/ABC_Database/Games/menu.html");
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
