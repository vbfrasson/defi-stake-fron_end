import {Token} from "../Main"
import React, {useState} from "react"
import { useEthers } from "@usedapp/core"
import {Box, makeStyles,Tab,Button} from "@material-ui/core"
import {TabContext, TabList, TabPanel} from "@material-ui/lab"
import {WalletBalance} from "./WalletBalance"
import { StakeForm } from "./StakeForm"



interface YourWalletProps{
    supportedTokens: Array<Token>

}

const useStyles = makeStyles((theme) => ({
    tabContent: {
        display: "flex",
        flexDirnection: "column",
        alignItems: "center",
        gap: theme.spacing(4)
    },
    box: {
        backgroundColor: "white",
        borderRadius: "25px"
    },
    header: {
        color: "black"
    },
    container: {
        padding:theme.spacing(4),
        display: 'flex',
        justifyContent: 'flex-end',
        gap: theme.spacing(1)
    }
}))

export const YourWallet = ({supportedTokens}: YourWalletProps) => {
    
    const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTokenIndex(parseInt(newValue))
    }
    const classes = useStyles()

    
    const{account, activateBrowserWallet, deactivate} = useEthers()
    const isConnected = account !==undefined

    return(
        
        <Box>
            <h1 className={classes.header}> Your Wallet! </h1>
            <Box className={classes.box}>
                <TabContext value={selectedTokenIndex.toString()}>
                    <TabList onChange={handleChange} aria-label="stake form tabs">
                        {supportedTokens.map((token, index) => {
                            return (
                                <Tab label={token.name}
                                    value={index.toString()}
                                    key={index} />
                            )
                        })}
                    </TabList>
                    {supportedTokens.map((token,index) => {
                        return (
                            <TabPanel value={index.toString()} key={index}>
                                <div>
                                    <WalletBalance token={supportedTokens[selectedTokenIndex]}/>
                                    <StakeForm token={supportedTokens[selectedTokenIndex]}/>
                                </div>
                            </TabPanel>
                        )
                    })}
                </TabContext>
            </Box>
        </Box>

            
    
         


        
    )

}