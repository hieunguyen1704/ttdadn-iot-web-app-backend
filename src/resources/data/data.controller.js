import db from '../../models';
import { Op } from 'sequelize';

const Data = db.Data;


export const getData = async (request, respond) => {
	if (!request.query.start || !request.query.end)
		return getCurrentRecord (request, respond)
	else
		return getRecordInRange (request, respond)
}

const getCurrentRecord = async (request, respond) => {
  try {
    const entries = await Data.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']],
    });
    let result = {
      temperature: entries[0].temperature,
      humid: entries[0].humid,
      light: entries[0].light,
      createdAt: entries[0].createdAt,
      updatedAt: entries[0].updatedAt,
    };
    return respond.status(200).json({ data: result });
  } catch (error) {
    return request.status(400).json({ error: error.message });
  }
};

const getRecordInRange = async (request, respond) => {
  try {
    let start = request.query.start;
    let end = request.query.end;
    const entries = await Data.findAll({
      order: [['createdAt', 'ASC']],
      where: { createdAt: { [Op.gte]: start, [Op.lte]: end } },
    });
    return respond.status(200).json({ data: entries });
  } catch (error) {
    return request.status(400).json({ error: error.message });
  }
};
