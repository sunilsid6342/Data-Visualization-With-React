import React, { Component } from 'react'
import CardSection from './Components/CardSection'
import Header from './Components/Header'
import ChartSection from './Components/ChartSection'

export default class App extends Component {
  constructor(){
    super()
    this.state={
      Id: "bitcoin",
      Data:{}
    }
  }
  curr="solana"
  fetchData=async ()=>{
    let data=await fetch("https://api.coingecko.com/api/v3/coins/"+this.state.Id)
    let jsonData=await data.json();
    this.setState({Id:"SOLANA",Data:jsonData})
    // 1:17
  }

  handlesubmit=async (e)=>{
    await this.setState({Id: e.target.value,Data:this.state.Data })
    this.fetchData()
  }

  componentDidMount(){
    this.fetchData()
  }

  render() {
    return (
      <>
        <Header handle_Submit={this.handlesubmit} />
        <CardSection coinName={this.state.Data.name} currentPrice={this.state.Data.market_data ? this.state.Data.market_data.current_price["usd"] : ""}
          mCap24={this.state.Data.market_data ? this.state.Data.market_data.market_cap_change_percentage_24h : ""}
          ath={this.state.Data.market_data ? this.state.Data.market_data.ath.usd : ""} atl={this.state.Data.market_data ? this.state.Data.market_data.ath.usd : ""}
          sentiment={this.state.Data.sentiment_votes_up_percentage} high24={this.state.Data.market_data ? this.state.Data.market_data.high_24h["usd"] : ""}
          low24={this.state.Data.market_data ? this.state.Data.market_data.low_24h["usd"] : ""} />
          <ChartSection Id={this.state.Id} priceChange24={this.state.Data.market_data ? this.state.Data.market_data.price_change_24h_in_currency.usd : ""} 
        MarketCap={this.state.Data.market_data ? this.state.Data.market_data.market_cap.usd  : ""}
        TotVol={this.state.Data.market_data ? this.state.Data.market_data.total_volume.usd  : ""}
        Circulating= {this.state.Data.market_data ? this.state.Data.market_data["circulating_supply"] : ""}
        twitterF = {this.state.Data.community_data ? this.state.Data.community_data.twitter_followers : ""} />
      </>
    )
  }
}
// https://api.coingecko.com/api/v3/coins/bitcoin
// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30