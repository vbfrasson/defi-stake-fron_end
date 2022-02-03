import { Ether, useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import { constants } from "ethers"
import networkMapping from "../chain-info/deployments/map.json"
import brownieConfig from "../brownie-config.json"
import dapp from "../dapp.png"
import eth from "../eth.png"
import dai from "../dai.png"
import { YourWallet } from "./yourWallet"
import { makeStyles } from "@material-ui/core"




export type Token = {
    image: string
    address: string
    name: string
}

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        textAlign: "center",
        padding: theme.spacing(4)
    }
}))

export const Main = () => {
    // Show token values from wallet
    // Get the address of different token
    // Get the balance of the users wallet

    // Send the brownie-config to the src folder
    // Send the build folder
    const classes = useStyles()
    const {chainId, error} = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    let stringChainId = String(chainId)

    const dappTokenAddress = chainId ? networkMapping[String(chainId)]["DappToken"][0] : constants.AddressZero
    // Weth and FAU tokens are defined in brownie-config instead of map.json
    const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
    const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero

    const supportedTokens: Array<Token>= [
        {
            image: dapp,
            address: dappTokenAddress,
            name: "DAPP"
        },
        {
            image: eth,
            address: wethTokenAddress,
            name: "WETH"
        },
        {
            image: dai,
            address: fauTokenAddress,
            name: "DAI"
        }

    ]

    return (<div> 
        <h2 className={classes.title}>Dapp Token App</h2>
        <div>HELLOOO</div>
        <YourWallet supportedTokens={supportedTokens} />
    </div>)
}