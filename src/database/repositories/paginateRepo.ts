import BaseRepo from "./baseRepo";

const SKIP_COUNT = 0;
const LIMIT_COUNT = 25;

abstract class PaginateRepo<Entity> extends BaseRepo<Entity>{

    protected async findAllPageWise( conditionObj, skipCount, limitCount ) {
        return ( await this.getModel().find( conditionObj )
                        .skip( skipCount ? skipCount : SKIP_COUNT )
                        .limit( limitCount ? limitCount : LIMIT_COUNT ).exec() );
    };
};

export default PaginateRepo;