import db from '../../models';

const Data = db.Data;

export const getCurrentRecord = async (request, respond) => 
{
	try
	{
		Data.findAll ( { limit: 1, order: [ [ 'createdAt', 'DESC' ] ], } )
			.then (function (entries)
				{
					var result = 
						{
							temperature: entries[0].temperature,
							humid: entries[0].humid,
							light: entries[0].light,
							createdAt: entries[0].createdAt,
							updatedAt: entries[0].updatedAt,
						};

					respond.status (200).json (result);
				});
	}
	catch (error)
	{
		return request.status(400).json({ error: error.message });
	}
};

export const getRecordInRange = async (request, respond) => 
{
	try
	{
		var start = request.query.start;
		var end = request.query.end;
		Data.findAll( { order: [ [ 'createdAt', 'ASC' ] ], where: { createdAt: { [Op.gte]: start, [Op.lte]: end, } }, } )
			.then( function (entries)
				{
					var result = 
						{
							records: entries,
						};

					respond.status (200).json (result);
				});
	}
	catch (error)
	{
		return request.status(400).json({ error: error.message });
	}
};
