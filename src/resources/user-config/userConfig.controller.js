import db from '../../models';
const UserConfig = db.UserConfig;
export const CreateConfig = async (req,res) =>{
    const body = req.body;
    try {
        await UserConfig.create({...body});
        return res.status(201).json({data: 'successful'});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
};
export const GetConfigByUser = async (req, res) =>{
    const currentUserId = req.params.userId;
    try {
        const userConfigs = await UserConfig.findAll({where: {userId: currentUserId }});
        return res.status(200).json({data: userConfigs});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
}
export const DeleteConfig = async (req, res) =>{
    const configId = req.params.id;
    try {
        await UserConfig.destroy({where: {id: configId}});
        return res.status(200).json({data: 'deleted successful'});
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({error: error.message});
    }
}
