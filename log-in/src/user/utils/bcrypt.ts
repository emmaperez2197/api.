import * as bcrypt from 'bcrypt'

export const comparePassword = async (password, hash ) => await bcrypt.compareSync( password, hash) 
