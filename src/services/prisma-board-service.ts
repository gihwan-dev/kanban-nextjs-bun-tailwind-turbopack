import prisma from "@/lib/prisma";
import { CreateBoardDto } from "@/features/main";
import { UpdateBoardDto } from "@/app/api/boards/[id]/type";

export const getBoardsService = async (email: string) => {
  return prisma.board.findMany({
    where: {
      user: {
        email,
      },
    },
    select: {
      board_id: true,
      title: true,
    },
  });
};

export const addNewColumns = async (boardId: number, data: string[]) => {
  return prisma.column.createMany({
    data: data.map(item => {
      return {
        title: item,
        board_id: boardId,
      };
    }),
  });
};

export const createNewBoard = async (data: CreateBoardDto, email: string) => {
  const user_id = await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  if (!user_id) {
    throw new Error("유저 정보를 찾을 수 없습니다.");
  }

  return prisma.board.create({
    data: {
      title: data.boardName,
      columns: {
        create: data.columns.map(item => {
          return {
            title: item,
          };
        }),
      },
      user_id: user_id.id,
    },
  });
};

export const updateBoard = async (boardId: number, form: UpdateBoardDto) => {
  return prisma.board.update({
    where: {
      board_id: boardId,
    },
    data: {
      columns: {
        create: form.columns.map(item => {
          return {
            title: item,
          };
        }),
      },
      title: form.title,
    },
  });
};

export const deleteBoard = async (boardId: number) => {
  return prisma.board.delete({
    where: {
      board_id: boardId,
    },
  });
};
