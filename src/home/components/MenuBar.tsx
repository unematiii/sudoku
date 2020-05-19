import React from "react";
import { Container, Dropdown, Icon, Menu } from "semantic-ui-react";

import styles from "./MenuBar.css";

export const MenuBar = () => 
    <Container className={styles.container}>
        <Menu size='large' secondary>
            <Menu.Item header as='h2' className={styles.logo}>
                <Icon name='check square outline' />Sudoku 
            </Menu.Item>

            <Menu.Menu position='right'>
                <Dropdown text='GAME' pointing='top right' className='link item'>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Icon name='redo' />New Game
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Icon name='pencil' />Solve Current
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Menu.Menu>
        </Menu>
    </Container>;
