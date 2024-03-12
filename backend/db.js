const mongoose = require('mongoose');
const mongoURI = 'mongodb://gofood:1410@ac-84lvgvn-shard-00-00.mzoqakd.mongodb.net:27017,ac-84lvgvn-shard-00-01.mzoqakd.mongodb.net:27017,ac-84lvgvn-shard-00-02.mzoqakd.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-802os3-shard-0&authSource=admin&retryWrites=true&w=majority'

const mongoDB = async () => {

    await mongoose.connect(mongoURI, { useNewUrlParser: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("Connected")
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCateogary = await mongoose.connection.db.collection("food_cateogary");
                foodCateogary.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCateogary = catData;


                    }


                })
                // if(err) console.log(err);
                // else {
                //    global.food_items = data;

                // }

            });
        }
    });
}
module.exports = mongoDB();