import connection from "../config/database";

const checkId = async (id) => {
    let [r, f] = await connection.query(
        `select * from service
        where SERVICE_ID = ?`,
        [id]
    );
    if (r.length === 0) return false;
    return true;
};

const readService = async () => {
    try {
        const [r, f] = await connection.query(`select * from service`);
        return {
            EM: "",
            EC: "0",
            DT: r,
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "database is error",
            EC: "-1",
            DT: "",
        };
    }
};

const createService = async (data) => {
    try {
        let chk = checkId(data.id);
        if (chk) {
            return {
                EM: "Id đã tồn tại!",
                EC: "1",
                DT: "",
            };
        }
        await connection.query(
            `insert into service values
            (?, ?, ?, ?)`,
            [data.id, data.name, data.price, data.desc]
        );
        return {
            EM: "",
            EC: "0",
            DT: "Thành công",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "database is error",
            EC: "-1",
            DT: "",
        };
    }
};

const deleteService = async (data) => {
    try {
        await connection.query(
            `update service_history
            set SERVICE_ID = NULL
            where SERVICE_ID = ?
            `,
            [data.id]
        );
        await connection.query(
            `delete from service
            where SERVICE_ID = ?`,
            [data.id]
        );
        return {
            EM: "Xóa dịch vụ thành công!",
            EC: "0",
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "database is error",
            EC: "-1",
            DT: "",
        };
    }
};

const updateService = async (data) => {
    try {
        await connection.query(
            `update service
            set SERVICE_NAME = ?, SERVICE_PRICE = ?, SERVICE_DESC = ?
            where SERVICE_ID = ?`,
            [data.name, data.price, data.desc, data.id]
        );
        return {
            EM: "Sửa thông tin phòng thành công!",
            EC: "0",
            DT: "",
        };
    } catch (error) {
        console.log(error);
        return {
            EM: "database is error",
            EC: "-1",
            DT: "",
        };
    }
};

module.exports = {
    readService,
    createService,
    deleteService,
    updateService,
};