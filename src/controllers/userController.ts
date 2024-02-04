import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/users';

const signup = async (_parent: unknown, { name, email, password }: {name:string,email:string,password:string}) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();

  const token = jwt.sign({ userId: user._id }, 'your_secret_key');
  return { token, user };
};

const login = async (_parent: unknown, { email, password }: {email:string,password:string}) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid login credentials');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    throw new Error('Invalid login credentials');
  }

  const token = jwt.sign({ userId: user._id }, 'your_secret_key');
  return { token, user };
};

const validateToken = async (_parent: unknown, { token }: { token: string }) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const decodedToken:any = jwt.verify(token, 'your_secret_key');

    const user = await User.findById(decodedToken.userId);

    if (!user) {
      throw new Error('User not found');
    }

    const protectedData = 'This is protected data';
    return { user, protectedData };
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export { signup, login ,validateToken};
