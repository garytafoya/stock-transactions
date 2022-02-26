import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseConfig } from '../db/firebase-config.js'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'

// init firebase app
initializeApp(firebaseConfig)

//init services
const db = getFirestore()

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        transactions: [],
        selectedTrade: {}
    },
    actions: {
      loadTransactions({ commit }) {
        const colRef = collection(db, 'Transactions')
        getDocs(colRef)
          .then((snapshot) => {
            let transactions = []
            snapshot.docs.forEach((doc) => {
              transactions.push({...doc.data()})
            })
            commit('LOAD_TRANSACTIONS', transactions)
          })
          .catch((error) => {
            console.log(error)
          })
      },
      addStockPurchase({ commit }, payload) {
        setDoc(doc(db, 'Transactions', payload.id), { ...payload })
        .then(
          commit('ADD_STOCK_PURCHASE', payload)
        )
        .catch((error) => {
          console.log(error)
        })
      },
      editTrade({ commit }, payload) {
        const docRef = doc(db, 'Transactions', payload.id)
        updateDoc(docRef, {
          buyDate: payload.buyDate,
          sellDate: payload.sellDate,
          buyTime: payload.buyTime,
          sellTime: payload.sellTime,
          buyPrice: payload.buyPrice,
          sellPrice: payload.sellPrice,
          symbol: payload.symbol,
          shares: payload.shares,
          buyTotal: payload.buyTotal,
          sellTotal: payload.sellTotal,
          gain: payload.gain,
          percentGain: payload.percentGain
        })
        .then(
          commit('UPDATE_TRANSACTION', payload)
        )
      },
      updateSelectedTrade({ commit }, payload) {
        commit('UPDATE_SELECTED_TRADE', payload)
      },
      deleteTrade({commit}, payload) {
        const docRef = doc(db, 'Transactions', payload)
        deleteDoc(docRef)
        .then(
          commit('DELETE_TRADE', payload)
        )
      }
    },
    mutations: {
      LOAD_TRANSACTIONS(state, payload) {
        state.transactions = payload
      },
      ADD_STOCK_PURCHASE(state, payload) {
        state.transactions.push(payload)
      },
      UPDATE_TRANSACTION(state, payload) {
        const transaction = state.transactions.find(transaction => {
          return transaction.id === payload.id
        })
        Object.assign(transaction, payload)
      },
      UPDATE_SELECTED_TRADE(state, payload) {
        state.selectedTrade = payload
      },
      DELETE_TRADE(state, payload) {
        const index = state.transactions.findIndex(trade => trade.id === payload)
        state.transactions.splice(index, 1)
      }
    },
    getters: {
      allTransactions (state) {
        return state.transactions
      },
      selectedTrade (state) {
        return state.selectedTrade
      },
      numberOfTrades(state) {
        return state.transactions.length
      },
      numberOfWinners(state) {
        let count = 0
        state.transactions.forEach(function (trade) {
          if (trade.gain > 0) { count++ }
        })
        return count
      },
      numberOfLosers(state) {
        let count = 0
        state.transactions.forEach(function (trade) {
          if (trade.gain < 0) { count++ }
        })
        return count
      }
    }
})
