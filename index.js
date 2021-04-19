import express from "express";
import { accountsRouter } from "./routes/accountsRouter.js";
import mongoose from "mongoose";

(async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin@cluster0.qgspv.mongodb.net/my-bank-api?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  } catch (err) {
    console.log("Erro ao conectar ao banco de dados");
  }
})();

const app = express();
app.use(express.json());
app.use(accountsRouter);

app.listen(3000, () => console.log(`API iniciada na porta 3000`));
