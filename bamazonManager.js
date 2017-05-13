var mysql = require("mysql");
require('dotenv').config();
var password = process.env.password;
var inquirer = require("inquirer");
var consoleTable = require("console.table");

var connection = mysql.createConnection(
  {host: "localhost",
  port: 3306,
  user: "root",
  password: password,
  database: 'Bamazon_DB'
});

connection.connect(function(err) {
  if(err) throw err;
  viewProducts();
});

var viewProducts = function(accessType) {

  connection.query("SELECT item_id, product_name, price FROM products", function(err, res)
  {
    if (err) throw err;
    
    // List full contents of products table
    console.table(res);

    if (accessType === "Customer") {
      var rowCount = res.length;
      buyItem(rowCount);
    }
  });
};

var buyItem = function(rowCount) {
  inquirer.prompt([{
    type: "input",
    name: "ID",
    message: "What is the ID of the item you would like to buy?",
    default: "number",
    validate: function(ID) {

      // Validate whether ID is a number and is not past the number of rows in the table.
      if (isNaN(ID) === false && ID <= rowCount) {
        return true;
      }
      return false;
    }
  }, {
    type: "input",
    name: "units",
    message: "How many units of the item would you like to buy?",
    default: "number",
    validate: function(units) {
      if (isNaN(units) === false) {
        return true;
      }
      return false;
    }
  }]).then(function(answer) {

    var query = "SELECT * FROM products WHERE item_id = ?";
    connection.query(query, [answer.ID], function(err, res) {
      if(err) throw err;

      if (answer.units > res[0].stock_quantity) {
        console.log("\nInsufficient quantity!\n\n");
      }
      else {
        var quantity = parseInt(res[0].stock_quantity - answer.units);

        // Gotta calculate the total before we start the update, it will be undefined afterwards.
        var total = answer.units + res[0].price;

        var query = "UPDATE products SET stock_quantity = " + quantity + " WHERE item_id = ?";
        connection.query(query, [answer.ID], function(err, res) {
          if(err) throw err;
          console.log("\nTotal Purchase = " + total + "\n\n");
        });
      };

      // Start a new buying experience.
      viewProducts();
    });
  });
};

var managerView = function() {

  var accessType = "Manager";

  inquirer.prompt({
    name: "action",
    type: "rawlist",
    message: "What would you like to do today?",
    choices: [
    "View Products for Sale",
    "View Low Inventory",
    "Add to Inventory",
    "Add New Product"
    ]
  }).then(function(answer) {
    switch (answer.action) {
      case "View Products for Sale":  // List every available item: the item IDs, names, prices, and quantities.
      viewProducts(accessType);
      break;

      case "View Low Inventory":  // List all items with a inventory count lower than five.
      lowInventory();
      break;

      case "Add to Inventory":  // Prompt to "add more" of any item currently in the store.
      addInventory();
      break;

      case "Add New Product":  // Allow manager to add a completely new product to the store.
      addNewProduct();
      break;

      default:
      viewProducts(accessType);
      break;
    }
  });
};

var artistSearch = function() {
  inquirer.prompt({
    name: "artist",
    type: "input",
    message: "What artist would you like to search for?"
  }).then(function(answer) {
    var query = "SELECT position, song, year FROM top5000 WHERE ?";
    connection.query(query, { artist: answer.artist }, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Year: " + res[i].year);
      }
      runSearch();
    });
  });
};

var multiSearch = function() {
  var query = "SELECT artist FROM top5000 GROUP BY artist HAVING count(*) > 1";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].artist);
    }
    runSearch();
  });
};

var rangeSearch = function() {
  inquirer.prompt([{
    name: "start",
    type: "input",
    message: "Enter starting position: ",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }, {
    name: "end",
    type: "input",
    message: "Enter ending position: ",
    validate: function(value) {
      if (isNaN(value) === false) {
        return true;
      }
      return false;
    }
  }]).then(function(answer) {
    var query = "SELECT position,song,artist,year FROM top5000 WHERE position BETWEEN ? AND ?";
    connection.query(query, [answer.start, answer.end], function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log("Position: " + res[i].position + " || Song: " + res[i].song + " || Artist: " + res[i].artist
          + " || Year: " + res[i].year);
      }
      runSearch();
    });
  });
};

var songSearch = function() {
  inquirer.prompt({
    name: "song",
    type: "input",
    message: "What song would you like to look for?"
  }).then(function(answer) {
    console.log(answer.song);
    connection.query("SELECT * FROM top5000 WHERE ?", { song: answer.song }, function(err, res) {
      console.log("Position: " + res[0].position + " || Song: " + res[0].song + " || Artist: "
        + res[0].artist + " || Year: " + res[0].year);
      runSearch();
    });
  });
};

var songAndAlbumSearch = function() {
  inquirer.prompt({
    name: "artist",
    type: "input",
    message: "What artist would you like to search for?"
  }).then(function(answer) {
    var query = "SELECT top_albums.year, top_albums.album, top_albums.position, top5000.song, top5000.artist ";
    query += "FROM top_albums INNER JOIN top5000 ON (top_albums.artist = top5000.artist AND top_albums.year ";
    query += "= top5000.year) WHERE (top_albums.artist = ? AND top5000.artist = ?) ORDER BY top_albums.year ";

    connection.query(query, [answer.artist, answer.artist], function(err, res) {
      console.log(res.length + " matches found!");
      for (var i = 0; i < res.length; i++) {
        console.log("Album Position: " + res[i].position + " || Artist: " + res[i].artist + " || Song: "
          + res[i].song + " || Album: " + res[i].album + " || Year: " + res[i].year);
      }

      runSearch();
    });
  });
};