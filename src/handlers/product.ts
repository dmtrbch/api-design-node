import prisma from "../db"

// Get all user products
export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true // this will get user products, it will make join, or population in Mongo
        }
    });

    res.json({ data: user.products });
}

// Get user product
export const getOneProduct = async (req, res) => {
    const id = req.params.id;
    // because we don't have unique index of this
    // the db might think we have more isntances of this combination
    // thats why we use findFirst
    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId: req.user.id
        }
    });

    res.json({ data: product });
}

// Create product
export const createProduct = async (req, res, next) => {
    try {
        const product = await prisma.product.create({
            data: {
                name: req.body.name,
                belongsToId: req.user.id
            }
        });
    
        res.json({ data: product });
    } catch (e) {
        next(e);
    }
}

// Update product
export const updateProduct = async (req, res) => {
    const updated = await prisma.product.update({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        },
        data: {
            name: req.body.name
        }
    });

    res.json({ data: updated });
}

// Delete product
export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id_belongsToId: {
                id: req.params.id,
                belongsToId: req.user.id
            }
        }
    });

    res.json({ data: deleted });
}

// upsert is create and update
// transactions ex. you do something in you database
// but at the same time you do another things let's say
// talking to stripe, error handling is important here