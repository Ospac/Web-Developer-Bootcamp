var faker = require("faker");
console.log("====================");
console.log("Welcome to my Shop!");
console.log("====================");
for(var i = 0; i < 10; i++){
    var fakeItem = faker.commerce.productName();
    var fakeMoney = faker.commerce.price();
    console.log(fakeItem + " - $" + fakeMoney);
}