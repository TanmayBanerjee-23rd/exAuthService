import { Model } from 'mongoose';

abstract class BaseRepo<Entity> {

    protected abstract getModel(): Model<Entity>;

    protected async create( entity: Entity ) {

        const modelInstance: Model<Entity> = this.getModel();

        const record = await new modelInstance( entity );

        await record.save();

        return record;
    };

    protected async findOne( conditionObj ) {
        return ( await this.getModel().findOne( conditionObj ).exec() );
    };

    protected async findAll( conditionObj ) {
        return ( await this.getModel().find( conditionObj ).exec() );
    };

    protected async updateOne( conditionObj, updatedObj ) {
        return ( await this.getModel().updateOne( conditionObj, updatedObj ).exec() );
    };

    protected async updateMany( conditionObj, updatedObj ) {
        return ( await this.getModel().updateMany( conditionObj, updatedObj ).exec() );
    };

    protected async deleteOne( conditionObj ) {
        return ( await this.getModel().deleteOne( conditionObj ).exec() );
    };

    protected async deleteMany( conditionObj ) {
        return ( await this.getModel().updateMany( conditionObj ).exec() );
    };
};

export default BaseRepo;