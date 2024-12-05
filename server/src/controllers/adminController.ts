import User from "../models/userModel";

// modify user to make admin or remove admin and also make user manager
const makeAdmin = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    const { userId } = req.body;
    //@ts-ignore
    if (req.user.id == userId) {
      //@ts-ignore
      return res.status(400).json({ message: "Cannot modify own role" });
    }
    //@ts-ignore
    if (!userId) return res.status(400).json({ message: "Invalid user" });

    // find user by id
    const user = await User.findById(userId);
    //@ts-ignore
    if (!user) return res.status(400).json({ message: "User not found" });

    if (user.superuser === true) {
      //@ts-ignore
      return res.status(400).json({ message: "Cannot modify superuser" });
    }

    if (user.role === "admin") {
      user.role = "user";
    } else {
      user.role = "admin";
    }

    await user.save();
    //@ts-ignore
    return res.status(200).json({ success: true, user });
  } catch (error) {
    //@ts-ignore
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { makeAdmin };
