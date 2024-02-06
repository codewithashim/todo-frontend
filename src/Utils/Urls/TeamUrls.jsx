import { baseUrl } from "../Network/Network";

export const createTeamUrl = baseUrl + "teams/create-team";

export const getAllTeamUrl = baseUrl + "teams/";

export const getTeamByIdUrl = (id) => baseUrl + `teams/${id}`;

export const updateTeamByIdUrl = (id) => baseUrl + `teams/${id}`;

export const deleteTeamByIdUrl = (id) => baseUrl + `teams/${id}`;

export const inviteUserToTeam = (id) => baseUrl + `teams/invite/'${id}`;
