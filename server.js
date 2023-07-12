const express = require('express');

const { ethers } = require('ethers');
const abi1= require('./abi.json');


const contractAddress = '0xFC1f2517b07BDF376cBBE246a7De87eDeE4979de';
const provider = new ethers.providers.JsonRpcProvider(
    `https://polygon-mumbai.g.alchemy.com/v2/BJCw7vChJyWr5UfTCMnt-E3klGQjBRYR`
);


async function start() {

    const app = express();
    app.get('/get', async (req, res) => {
        try {
            const userAddress = '0x5859464Befb9d3275B7e35De616f8fEAf79336B7'

            const contract = new ethers.Contract(contractAddress, abi1, provider);

            console.log("1")
            // console.log(contract)
            const data1 = await contract.getDecentrides(userAddress);
            
            console.log(data1);
            res.json( {data1} );

        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch data from the contract' });
        }

    });

    // Start the Express server
    app.listen(3000, () => console.log('Server running on port 3000'));

}

start();