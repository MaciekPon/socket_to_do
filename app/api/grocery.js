import clientPromise from "../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("grocery");
        const groceryList = await db
            .collection("grocery_list")
            .find({})
            .limit(10)
            .toArray();
        res.json(groceryList);
    } catch (e) {
        console.error(e);
    }
}