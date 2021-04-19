import express from "express";
import { findUserRequisition } from "../controller/accountsController.js";
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
app.get("/account/:agencia/:conta", async (req, res) => {
  try {
    const { agencia, conta } = req.params;
    const account = await accountModel.find({
      agencia,
      conta,
    });
    res.send(account);
  } catch (err) {
    res.status(500).send(err);
  }
});

//update = patch
//account deposit
app.patch("/account/deposit/:agencia/:conta/:value", async (req, res) => {
  try {
    const { agencia, conta, value } = req.params;
    const account = await findUserRequisition(agencia, conta);
    if (account === 0) {
      res.send("Conta não registrada");
    }
    const { balance } = account;
    const exchangeValue = Number(balance) + Number(value);
    if (exchangeValue >= 0) {
      const acc = await accountModel.findByIdAndUpdate(
        { _id: account._id },
        { balance: exchangeValue },
        { new: true }
      );
      res.send(acc);
    } else {
      res.send(`Você não pode sacar mais de ${balance - 1} reais`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
//account exchange
app.patch("/account/exchange/:agencia/:conta/:value", async (req, res) => {
  try {
    const { agencia, conta, value } = req.params;
    const account = await findUserRequisition(agencia, conta);
    if (account === 0) {
      res.send("Conta não registrada");
    }
    const { balance } = account;
    const exchangeValue = Number(balance) - Number(value) - 1;
    if (exchangeValue >= 0) {
      const acc = await accountModel.findByIdAndUpdate(
        { _id: account._id },
        { balance: exchangeValue },
        { new: true }
      );
      res.send(acc);
    } else {
      res.send(`Você não pode sacar mais de ${balance - 1} reais`);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
//transfer balance

//delete = delete
app.delete("/account/:agencia/:conta", async (req, res) => {
  try {
    const { agencia, conta } = req.params;
    await accountModel.findOneAndDelete({
      agencia,
      conta,
    });
    const accounts = await accountModel.find({});
    res.send(accounts);
  } catch (err) {
    res.status(500).send(err);
  }
});

export { app as accountsRouter };
