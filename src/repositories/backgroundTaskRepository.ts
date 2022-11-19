import { TaskStatus } from "@prisma/client";
import prisma from "../core/prisma";

export const backgroundTaskRepository = {
  getOrCreateTask(taskName: string) {
    return prisma.backgroundTask.upsert({
      create: {
        name: taskName,
      },
      update: {},
      where: {
        name: taskName,
      },
    });
  },
  getTaskByName(taskName: string) {
    return prisma.backgroundTask.findUnique({
      where: {
        name: taskName,
      },
    });
  },
  startTaskByName(taskName: string) {
    return prisma.backgroundTask.update({
      where: {
        name: taskName,
      },
      data: {
        status: TaskStatus.STARTED,
      },
    });
  },
  stopTaskByName(taskName: string) {
    return prisma.backgroundTask.update({
      where: {
        name: taskName,
      },
      data: {
        status: TaskStatus.STOPPED,
      },
    });
  },
};
