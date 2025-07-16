import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Game service functions
export const gameService = {
  // Get all games
  async getAllGames() {
    try {
      const response = await axios.get(`${API}/games`);
      return response.data;
    } catch (error) {
      console.error('Error fetching games:', error);
      throw error;
    }
  },

  // Create new game
  async createGame(gameData) {
    try {
      const response = await axios.post(`${API}/games`, gameData);
      return response.data;
    } catch (error) {
      console.error('Error creating game:', error);
      throw error;
    }
  },

  // Update game
  async updateGame(gameId, gameData) {
    try {
      const response = await axios.put(`${API}/games/${gameId}`, gameData);
      return response.data;
    } catch (error) {
      console.error('Error updating game:', error);
      throw error;
    }
  },

  // Delete game
  async deleteGame(gameId) {
    try {
      await axios.delete(`${API}/games/${gameId}`);
      return true;
    } catch (error) {
      console.error('Error deleting game:', error);
      throw error;
    }
  },

  // Increment download counter
  async incrementDownload(gameId) {
    try {
      await axios.post(`${API}/games/${gameId}/download`);
      return true;
    } catch (error) {
      console.error('Error incrementing download:', error);
      throw error;
    }
  },

  // Get statistics
  async getStats() {
    try {
      const response = await axios.get(`${API}/stats`);
      return response.data;
    } catch (error) {
      console.error('Error fetching stats:', error);
      throw error;
    }
  }
};