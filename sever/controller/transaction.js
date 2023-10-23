const Transaction = require('../model/transaction');

exports.getUserTransactions = (req, res, next) => {
    Transaction.find({user: req.query.user})
        .then(transactions => {
            res.status(200).send(transactions)
        })
        .catch(err => console.log(err));
};

exports.postTransactions = (req, res, next) => {
    console.log(req.body);
    const newTransaction = new Transaction(req.body);
    newTransaction.save()
        .then(results => {
            console.log('ADDED TRANSACTION: ',results);
            res.status(200).end();
        })
        .catch(err => console.log('ADDED TRANSACTION ERROR: ',err));
};

exports.getAdminTransactions = async (req, res, next) => {
    const limit = req.query.limit;
    const page = req.query.page ? req.query.page : 1
    const skip = (page - 1) * limit

    const count = await Transaction.find().then(transactions => {
        return transactions.length
    })

    Transaction.find().limit(limit).sort({createAt: 'desc'}).skip(skip)
        .populate('hotel')
        .then(transactions => {
            res.json({
                transactions: transactions,
                count: count
            });
        })
        .catch(err => console.log(err));
};