import { baseUrl } from "../Network/Network";

export const createTaskUrl = baseUrl + "tasks/create-task";

export const getAllTaskUrl = baseUrl + "tasks/";

export const getTaskByIdUrl = (id) => baseUrl + `tasks/${id}`;

export const updateTaskByIdUrl = (id) => baseUrl + `tasks/${id}`;

export const deleteTaskByIdUrl = (id) => baseUrl + `tasks/${id}`;
