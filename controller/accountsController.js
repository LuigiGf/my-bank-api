import express from "express";
import mongoose from "mongoose";
import { accountModel } from "../models/accountModel.js";

async function findUserRequisition(agencia, conta) {
  const user = await accountModel.findOne({
    agencia: `${agencia}`,
    conta: `${conta}`,
  });
  if (!user) {
    return 0;
  }
  return user;
}

export { findUserRequisition };
