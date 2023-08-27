import prismadb from "@/lib/prismadb";
import { userInfo } from "@/utils/userInfo";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  {
    params,
  }: {
    params: {
      colorId: string;
    };
  }
) {
  try {
    if (!params.colorId) {
      return new NextResponse("Size ID is required", {
        status: 400,
      });
    }

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_GET]", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
      colorId: string;
    };
  }
) {
  try {
    const { kind, userId } = userInfo();
    if (kind === "not-logged") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    const body = await req.json();
    const { name, value } = body;

    if (!name) {
      return new NextResponse("Name is required", {
        status: 400,
      });
    }
    if (!value) {
      return new NextResponse("Value is required", {
        status: 400,
      });
    }
    if (!params.storeId || !params.colorId) {
      return new NextResponse("Store ID or Size ID is missing", {
        status: 400,
      });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", {
        status: 403,
      });
    }
    const color = await prismadb.color.updateMany({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_PATCH]", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}

export async function DELETE(
  _req: Request,
  {
    params,
  }: {
    params: {
      storeId: string;
      colorId: string;
    };
  }
) {
  try {
    const { kind, userId } = userInfo();
    if (kind === "not-logged") {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    if (!params.storeId) {
      return new NextResponse("Store ID is required", {
        status: 400,
      });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        userId,
        id: params.storeId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse("Unauthorized", {
        status: 403,
      });
    }

    const color = await prismadb.color.deleteMany({
      where: {
        id: params.colorId,
      },
    });
    return NextResponse.json(color);
  } catch (error) {
    console.log("[COLOR_DELETE]", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
