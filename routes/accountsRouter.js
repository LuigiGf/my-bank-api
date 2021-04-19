import express from "express";
import { accountModel } from "../models/accountModel.js";

const app = express();

//create = post
//retrieve = get
app.get("/accounts", async (req, res) => {
  try {
    const account = await accountModel.find({});
    res.send(account);
  } catch (err) {
    res.status(500).send(err);
  }
});

//update = patch
app.patch("/account/:agencia/:conta/:value", async (req, res) => {
  try {
    const acc = await accountModel.findOne({
      agencia: req.params.agencia,
      conta: req.params.conta,
    });
    const data = Number(acc.balance) + Number(req.params.value);
    const account = await accountModel.findOneAndUpdate(
      {
        _id: acc._id,
      },
      { balance: data },
      { new: true }
    );

    res.send(account);
  } catch (err) {
    res.status(500).send(err);
  }
});

//delete = delete

export { app as accountsRouter };
