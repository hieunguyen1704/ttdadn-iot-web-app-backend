import db from '../../models';
export const getLastMotorState= async (req, res) => {
    try {
        const lastState = await db.motorLogs.findAll({
            limit: 1,
            order: [ [ 'createdAt', 'DESC' ]]
        });
        // console.log(lastState[0].id, lastState[0].state);
        const lastMotorState = lastState[0].state;
        return res.status(200).json({data: lastMotorState});

    } catch (error) {
      console.log(error.message);
      return res.status(400).json({ error: error.message });
    }
  };
