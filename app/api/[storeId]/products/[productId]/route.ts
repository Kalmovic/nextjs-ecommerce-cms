import prismadb from "@/lib/prismadb";
import { userInfo } from "@/utils/userInfo";
import { Image, Product } from "@prisma/client";
import { NextResponse } from "next/server";
import { AsyncReqBodyProductType } from "../route";

export async function GET(
  _req: Request,
  {
    params,
  }: {
    params: {
      productId: string;
    };
  }
) {
  try {
    if (!params.productId) {
      return new NextResponse("Billboard ID is required", {
        status: 400,
      });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        images: true,
        category: true,
        color: true,
        size: true,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_GET]", error);
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
      productId: string;
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
    const body: AsyncReqBodyProductType = await req.json();
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    if (!name) {
      return new NextResponse("Name is required", {
        status: 400,
      });
    }
    if (!price) {
      return new NextResponse("Price is required", {
        status: 400,
      });
    }
    if (!categoryId) {
      return new NextResponse("Category ID is required", {
        status: 400,
      });
    }
    if (!colorId) {
      return new NextResponse("Color ID is required", {
        status: 400,
      });
    }
    if (!sizeId) {
      return new NextResponse("Size ID is required", {
        status: 400,
      });
    }
    if (!images || !images.length) {
      return new NextResponse("Images are required", {
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
    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        images: {
          deleteMany: {},
        },
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
      },
    });
    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        images: {
          createMany: {
            data: [
              ...images.map((image) => ({
                url: image.url,
              })),
            ],
          },
        },
        price,
        categoryId,
        colorId,
        sizeId,
        isFeatured,
        isArchived,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error);
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
      productId: string;
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

    const product = await prismadb.product.deleteMany({
      where: {
        id: params.productId,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log("[BILLBOARD_DELETE]", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
