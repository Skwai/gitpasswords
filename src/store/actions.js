import gh from '../services/gh'

export const login = () => gh.login()

export const getGists = async ({ commit }) => {
  const repos = await gh.getRepos()
  commit('SET_GISTS', repos)
}

export const selectGist = ({ commit }, gistId) => {
  commit('SET_GIST', gistId)
}

export const getPasswords = async ({ commit }, { repo, secret }) => {
  const entries = gh.getEntries()
  commit('SET_ENTRIES', entries)
  commit('SET_SECRET', secret)
}
