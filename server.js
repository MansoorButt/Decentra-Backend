const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const { ethers } = require("ethers");
const abi1 = require("./abis/abi.json");
const abi2 = require("./abis/jobs.json");
const cors = require('cors')
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

const contractAddress = "0xFC1f2517b07BDF376cBBE246a7De87eDeE4979de";
const contract2 = "0x387E859cC638080e313FeAa546331E2E8a4b916B";
const provider = new ethers.providers.JsonRpcProvider(
  `https://polygon-mumbai.g.alchemy.com/v2/BJCw7vChJyWr5UfTCMnt-E3klGQjBRYR`
);

const app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));
app.get("/get", async (req, res) => {
  try {
    const userAddress = "0x5859464Befb9d3275B7e35De616f8fEAf79336B7";
    const PRIVATE_KEY = process.env.PRIVATE_KEY;
    const signer = new ethers.Wallet(PRIVATE_KEY, provider);
    const contract = new ethers.Contract(contractAddress, abi1, signer);
    console.log("1");
    console.log(signer.privateKey);
    const signerAddress = await signer.getAddress();
    console.log("Signing with", signerAddress);
    // console.log(contract)
    const data1 = await contract.getDecentrides(userAddress);
    // console.log("These are registered Virtual Machine",data1);
    const contract3 = new ethers.Contract(contract2, abi2, provider);
    console.log("2");
    // console.log(contract)
    const jobs = await contract3.getJobs();
    // console.log("These are all jobs",jobs);
    console.log("The recieved Job id is :", jobs);
    // const tx = await contract._acceptJob(parseInt(jobs[1].jobId.toString()),signerAddress);
    // await tx.wait();
    res.json({ data1, jobs });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from the contract" });
  }
});
app.get("/getJobs", async (req, res) => {
  try {
    const contract3 = new ethers.Contract(contract2, abi2, provider);
    console.log("2");
    // console.log(contract)
    const data2 = await contract3.getJobs();
    console.log(data2);
    res.json({ data2 });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data from the contract" });
  }
});
app.post("/job", async (req, res) => {
  let data  = req.body;
  console.log(data);
  res.status(201).send("Chimpanzee");
//   res.json(data)
});

// Start the Express server
app.listen(3002, () => console.log("Server running on port 3002"));
