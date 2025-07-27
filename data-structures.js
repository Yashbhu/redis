const redis = require('redis');

// Create a Redis client
const client = redis.createClient({
  socket: {
    host: 'localhost', // fixed typo: "local host" -> "localhost"
    port: 6379,         // default port
  }
});

// Event listener for errors
client.on('error', (error) => {
  console.log('Redis client error occurred:', error);
});


async function datastructures(){
    try {
        await client.connect()
        //strings -> set,get,mset multiple set ,mget
        await client.set('user:name',"yash")
        const name = await client.get("user:name")
        console.log(name)

//mset ke lie just take an arryay and put keys then its value like ['user:email','zyx@..','age','60',...similarly)
   //now to log thtt use destrucitng like const [email,age,country] which wil get values= awiat mget(now give kesy like user:email age etc )


//list->lpush,rpush,lrange,lpop,rpop
// LPUSH 1, 2, 3
await client.lPush('mylist', 1, 2, 3); // [3,2,1]

// LRANGE
console.log(await client.lRange('mylist', 0, -1)); // [3,2,1]

// LPOP
console.log(await client.lPop('mylist')); // 3
console.log(await client.lRange('mylist', 0, -1)); // [2,1]

// RPUSH 'a','b'
await client.rPush('mylist', 'a', 'b'); // [2,1,a,b]

// RPOP
console.log(await client.rPop('mylist')); // b
console.log(await client.lRange('mylist', 0, -1)); // [2,1,a]


// sets -> SADD, SMEMBERS, SISMEMBER, SREM
    await client.sAdd("user:nickName", ["john", "varun", "xyz"]);
     const extractUserNicknames = await client.sMembers("user:nickName");

     console.log(extractUserNicknames);

     const isVarunIsOneOfUserNickName = await client.sIsMember(
       "user:nickName",
       "varun"
     );
     console.log(isVarunIsOneOfUserNickName);

     await client.sRem("user:nickName", "xyz");

     const getUpdatedUserNickNames = await client.sMembers("user:nickName");
     console.log(getUpdatedUserNickNames);

//soorted sets maintain order of the sets by redis so it would help in leadersboars
//sorted sets
    // ZADD, ZRANGE, ZRANK, ZREM

    // await client.zAdd("cart" key value , [then passed aray which will associate to key
    //   {
    //     score: 100,
    //     value: "Cart 1",
    //   },
    //   {
    //     score: 150,
    //     value: "Cart 2",
    //   },
    //   {
    //     score: 10,
    //     value: "Cart 3",
    //   },
    // ]);

//STORE THT CART KEY VALEUS BY INDEXING TO CONST TO PRINT IT OR LOG IT RANK WISE OR SCOREWISE


    // const getCartItems = await client.zRange("cart", 0, -1);
    // console.log(getCartItems);

    //WITH SCORE VALUES 


    // const extractAllCartItemsWithScore = await client.zRangeWithScores(
    //   "cart",
    //   0,
    //   -1
    // );
    // console.log(extractAllCartItemsWithScore);

    //WIRH RANK  OF SPEFOC RANK OF CAET 2 ASSOOCATED RTO CART KEY
    
    // const cartTwoRank = await client.zRank("cart", "Cart 2");
    // console.log(cartTwoRank);




} catch (error) {
        console.log(error)
    }finaly{
        client.quit()
    }
}
redisdatastructure()