import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseConfig } from '../db/firebase-config.js'
import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  onSnapshot,
  getDocs,
  updateDoc
} from 'firebase/firestore'

// init firebase app
initializeApp(firebaseConfig)

//init services
const db = getFirestore()

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        transactions: []
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
      loadTransactionsAAA({ commit }) {
        const colRef = collection(db, 'Transactions')

        onSnapshot(colRef, (snapshot) => {
          let transactions = snapshot.data().transactions
          commit('LOAD_TRANSACTIONS', transactions)
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
      updateTransaction({ commit }, payload) {
        console.log(payload)
        const docRef = doc(db, 'Transactions', payload.id)

        updateDoc(docRef, {
          sellDate: payload.sellDate,
          sellPrice: payload.sellPrice,
          sellTime: payload.sellTime,
          sellTotal: payload.sellTotal,
          gain: payload.gain,
          percentGain: payload.percentGain
        })
        .then(
          commit('UPDATE_TRANSACTION', payload)
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

        transaction.sellDate = payload.sellDate
        transaction.sellTime = payload.sellTime
        transaction.sellPrice = payload.sellPrice
        transaction.sellTotal = payload.sellTotal
        transaction.gain = payload.gain
        transaction.percentGain = payload.percentGain
      }
    },
    getters: {
      allTransactions (state) {
        return state.transactions
      }
    }
})
