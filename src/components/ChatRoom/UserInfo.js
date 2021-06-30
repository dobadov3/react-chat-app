import React, { useContext } from "react";
import {Avatar, Typography, Button} from 'antd'
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthProvider';
import { auth, db } from "../../firebase/config";
import {PlusOutlined} from "@ant-design/icons"
import { AppContext } from "../../contexts/AppProvider";

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    border-bottom: 1px solid #ddd;

    .avatar {
        margin-right: 10px;
    }

    .user-name{
        font-size: 18px;
        font-weight: 500;
    }

    .btn-logout{
        border-radius: 10px;
    }
`;

export default function UserInfo() {
    const {user} = useContext(AuthContext);
    const {setVisibleModal} = useContext(AppContext);

    const logOut = () => {
        auth.signOut();
    }

    return (
        <Wrapper>
            <div>
                <Avatar className='avatar' size={45} src={user.photoURL}>
                    {user.photoURL
                        ? ""
                        : user.displayName?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography.Text className='user-name'>
                    {user.displayName}
                </Typography.Text>
            </div>
            <div>
                <Button
                    className='btn-logout'
                    onClick={() => setVisibleModal(true)}
                    style={{ marginRight: "10px" }}
                    icon={<PlusOutlined />}></Button>
                <Button className='btn-logout' onClick={logOut}>
                    Đăng xuất
                </Button>
            </div>
        </Wrapper>
    );
}
