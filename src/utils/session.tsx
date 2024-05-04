import axios from '@/config/axiosConfig';
import jwt, { Secret , Algorithm} from 'jsonwebtoken';


const SECRET_KEY = process.env.JWT_SECRET as Secret;
const ALGORITHM = process.env.ALGORITHM as Algorithm;

export async function validateSession(req: { headers: any; }) {
  try {
    const { data } = await axios.get('/usuarios/validate_session', {
      headers: {
        Cookie: req.headers.cookie,
      }
    });
    return data;
  } catch (error: any) {
    console.error('Error al validar la sesión:', error.response ? error.response.data : error.message);
    return null;
  }
}


export function verifyAccessToken(token: any) {
  try {
    const decoded = jwt.verify(token, SECRET_KEY, { algorithms: [ALGORITHM] });
    return decoded; 
  } catch (error) {
    console.error('Error verifying JWT:', error);
    return null; 
  }
}

