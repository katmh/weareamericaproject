/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link } from 'gatsby'
import React from 'react'

function slugify(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')
  
    return string.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
      .replace(/&/g, '-and-') // Replace & with 'and'
      .replace(/[^\w\-]+/g, '') // Remove all non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
  }

const Dropdown = ({ props }) => (
    <>
        <p
            sx={{
                fontFamily: 'body',
                fontSize: [0,1],
                fontWeight: 300,
                color: 'text',
                fontFamily: 'body',
                my: 2,
                mr: '.5rem'
            }}
        >
            View stories by
        </p>
        <div
            sx={{
                display: 'inline-block',
                ':hover ul': {
                    display: 'block',
                    maxHeight: '30vh',
                }
            }}
        >
            <button
                sx={{
                    background: '#ddd',
                    border: 'none',
                    outline: 'none',
                    display: 'inline-block',
                    cursor: 'pointer',
                    fontFamily: 'heading',
                    fontWeight: '400',
                    padding: '.4rem .6rem .25rem',
                    fontSize: 1,
                    color: 'text',
                }}
            >
                Topic
            </button>
            <ul
                sx={{
                    display: 'none',
                    overflowY: 'scroll',
                    position: 'absolute',
                    float: 'left',
                    opacity: '1',
                    transition: '.15s',
                    border: '1px solid #bbb'
                }}
            >
                {props.data.tags.group.map((group) => (
                <li
                    sx={{
                        listStyle: 'none',
                        fontFamily: 'body',
                        background: '#fff',
                    }}
                >
                    <Link
                        to={'/tag/' + slugify(group.fieldValue)}
                        sx={{
                            textDecoration: 'none',
                            fontFamily: 'heading',
                            fontWeight: '400',
                            padding: '.4rem .6rem .25rem',
                            fontSize: 1,
                            color: 'text',
                            display: 'block',
                            transition: '.15s',
                            ':hover': {
                                background: '#633',
                                color: '#fff'
                            }
                        }}
                    >
                        {group.fieldValue}
                    </Link>
                </li>
                ))}
            </ul>
        </div>
    </>
)

export default Dropdown