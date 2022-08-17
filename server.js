const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const { Sequelize, DataTypes } = require('sequelize')
const PORT = process.env.PORT || 7070
const sequelize = new Sequelize(
    'postgres://eyrzjqqi:aYTKVhWnPrf45jNwnzHD0Y2lALahMx6o@topsy.db.elephantsql.com/eyrzjqqi'
)

sequelize
    .authenticate()
    .then(() => console.log('Connected'))
    .catch((error) => console.log(error))

const Restaurants = sequelize.define("restaurants", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(28),
        allowNull: false
    },
    imgUrl: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

const milliyRestaurants = sequelize.define("milliyrestaurants", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(28),
        allowNull: false
    },
    imgUrl: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

const orders = sequelize.define("order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    product: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nomer: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    addres: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

const milliyOrders = sequelize.define("milliyorder", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    product: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    nomer: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    addres: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

const product = sequelize.define("products", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(28),
        allowNull: false
    },
    imgUrl: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    price: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

const Milliyproduct = sequelize.define("milliyproducts", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(28),
        allowNull: false
    },
    imgUrl: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    prices: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

product.belongsTo(Restaurants)

Restaurants
    .sync({ force: false })
product
    .sync({ force: false })
milliyRestaurants
    .sync({ force: false })
Milliyproduct
    .sync({ force: false })
orders
    .sync({ force: false })
milliyOrders
    .sync({ force: false })


app.get('/', async(req, res) => {
    res.json(await Restaurants.findAll())
})

app.get('/restaurants', async(_, res) => {
    res.json(await Restaurants.findAll())
})

app.get('/order', async(_, res) => {
    res.json(await orders.findAll())
})

app.get('/milOrder', async(_, res) => {
    res.json(await milliyOrders.findAll())
})

app.get('/milliy', async(_, res) => {
    res.json(await milliyRestaurants.findAll())
})

app.get('/milliyProduct', async(_, res) => {
    res.json(await Milliyproduct.findAll())
})

app.get('/products', async(_, res) => {
    res.json(await product.findAll())
})

app.get('/restaurants/:id', async(req, res) => {
    const {id} = req.params
    res.json(await Restaurants.findAll({
        where: {
            id
        }
    }))
})

app.get('/products/:id', async(req, res) => {
    const {id} = req.params
    res.json(await product.findAll({
        where: {
            id
        }
    }))
})

app.post('/restaurants', async(req, res) => {
    const { name, imgUrl } = req.body
    const newRestaurant = await Restaurants.create({ name, imgUrl })
    res.send(newRestaurant)
})

app.post('/order', async(req, res) => {
    const { name, product, nomer, addres } = req.body
    const newRestaurant = await orders.create({ name, product, nomer, addres })
    res.send(newRestaurant)
})

app.post('/milOrder', async(req, res) => {
    const { name, product, nomer, addres } = req.body
    const newRestaurant = await milliyOrders.create({ name, product, nomer, addres })
    res.send(newRestaurant)
})

app.post('/milliy', async(req, res) => {
    const { name, imgUrl } = req.body
    const newRestaurant = await milliyRestaurants.create({ name, imgUrl })
    res.send(newRestaurant)
})

app.post('/milliyProduct', async(req, res) => {
    const { name, imgUrl, prices } = req.body
    const newBranch = await Milliyproduct.create({name, imgUrl, prices })

    res.json(newBranch)
})

app.post('/product', async(req, res) => {
    const { name, imgUrl, price } = req.body
    const newBranch = await product.create({name, imgUrl, price })

    res.json(newBranch)
})

app.delete('/restaurants/:id', async(req, res) => {
    const { id } = req.params

    const deletedRestaurants = await Restaurants.destroy({
        where: {
            id
        },
        returning: true,
        plain: true
    })

    res.json(deletedRestaurants)
})

app.delete('/milliy/:id', async(req, res) => {
    const { id } = req.params

    const deletedRestaurants = await milliyRestaurants.destroy({
        where: {
            id
        },
        returning: true,
        plain: true
    })

    res.json(deletedRestaurants)
})

app.delete('/product/:id', async(req, res) => {
    const { id } = req.params

    const deletedBranch = await product.destroy({
        where: {
            id
        },
        returning: true,
        plain: true
    })

    res.json(deletedBranch)
})

app.delete('/milliyProduct/:id', async(req, res) => {
    const { id } = req.params

    const deletedBranch = await Milliyproduct.destroy({
        where: {
            id
        },
        returning: true,
        plain: true
    })

    res.json(deletedBranch)
})

app.listen(PORT, console.log(PORT))