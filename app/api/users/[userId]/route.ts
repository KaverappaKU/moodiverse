import { NextResponse } from "next/server";
import connect from "@/lib/db";
import mongoose, { Types } from "mongoose";
import User from "@/lib/models/users";

export const GET = async (request: Request, context: { params: any }) => {
  try {
    const userId = context.params.userId;

    if (!userId || !Types.ObjectId.isValid(userId)) {
      return new NextResponse(JSON.stringify({ message: "Invalid user" }), {
        status: 400,
      });
    }
    await connect();

    let user = await User.findById(userId);

    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    return new NextResponse(
      JSON.stringify({
        message: "User Details fetched successfully!",
        data: user,
      }),
      { status: 200 }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Error in fetching user" }),
      { status: 500 }
    );
  }
};

export const PUT = async (request: Request) => {
  try {
    const { _id, fullname, email } = await request.json();

    await connect();

    // check if the userId is valid
    if (!_id || !Types.ObjectId.isValid(_id)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId!" }),
        { status: 400 }
      );
    }

    // check if the user exists
    const user = await User.findById(_id);
    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User does not exist!" }),
        { status: 400 }
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      {
        fullname,
        email,
      },
      {
        new: true,
      }
    );

    // check if the process successed
    if (!updatedUser) {
      return new NextResponse(
        JSON.stringify({ message: "User not updated!" }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: "User updated successfully!",
        data: updatedUser,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ message: "Error in updating user" + err }),
      { status: 500 }
    );
  }
};

export const DELETE = async (request: Request) => {
  try {
    // extract the fields from the request object
    const { _id } = await request.json();

    // establish the connection with database
    await connect();

    // check if the userId is valid
    if (!_id || !Types.ObjectId.isValid(_id)) {
      return new NextResponse(
        JSON.stringify({ message: "Invalid or missing userId!" }),
        { status: 400 }
      );
    }

    // check if the user exists in the database
    const user = await User.findById(_id);
    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: "User does not exist!" }),
        { status: 400 }
      );
    }

    const deleteUser = await User.findByIdAndDelete({
      _id: user._id,
    });

    // check if the process successed
    if (!deleteUser) {
      return new NextResponse(
        JSON.stringify({ message: "User not deleted!" }),
        { status: 400 }
      );
    }

    return new NextResponse(
      JSON.stringify({
        message: `${user.fullname} has been deleted successfully!`,
      }),
      {
        status: 200,
      }
    );
  } catch (err) {
    return new NextResponse("Error in deleting user " + err, {
      status: 500,
    });
  }
};
