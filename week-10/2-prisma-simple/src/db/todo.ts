import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function createTodo(
  userId: number,
  title: string,
  description: string
) {
  const todo = await prisma.todo.create({
    data: {
      userId: userId,
      title: title,
      description: description,
      done: false,
    },
    select: {
      id: true,
      title: true,
      description: true,
      done: true,
    },
  });
  return todo;
}
/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */
export async function updateTodo(todoId: number) {
  const updatedTodo = await prisma.todo.update({
    where: {
      id: todoId,
    },
    data: {
      done: true,
    },
    select: {
      done: true,
    },
  });
  return updatedTodo;
}

/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */
export async function getTodos(userId: number) {
  const allTodos = await prisma.todo.findMany({
    where: {
      userId: userId,
    },
    select: {
      userId: true,
    },
  });
  return allTodos;
}
