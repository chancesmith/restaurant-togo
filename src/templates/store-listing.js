import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const StoreListingTemplate = ({
  contentComponent,
  tags,
  restaurantName,
  helmet,
  data,
  menuItems
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {restaurantName}
            </h1>

            {data.address !== "" ? (
              <p>
                Address: <address>{data.address}</address>
              </p>
            ) : null}

            {data.phoneNumber !== "" ? (
              <p>
                Phone: <address>{data.phoneNumber}</address>
              </p>
            ) : null}

            {data.onlineOrderLink !== "" ? (
              <p>
                Online order link: <address>{data.onlineOrderLink}</address>
              </p>
            ) : null}

            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Food Style</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {menuItems && menuItems.length ? (
              <div style={{ marginTop: `3rem` }}>
                <h4>ToGo Menu</h4>
                <ul>
                  {menuItems.map(mItem => (
                    <li key={mItem.name + `mItem`}>
                      {mItem.name} - ${mItem.price}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

StoreListingTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  // description: PropTypes.string,
  restaurantName: PropTypes.string,
  helmet: PropTypes.object,
  data: PropTypes.object,
  menuItems: PropTypes.object
};

const StoreListing = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <StoreListingTemplate
        content={post.html}
        contentComponent={HTMLContent}
        // description={post.frontmatter.description}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.restaurantName}`}</title>
            {/* <meta
              name="description"
              content={`${post.frontmatter.description}`}
            /> */}
          </Helmet>
        }
        tags={post.frontmatter.tags}
        restaurantName={post.frontmatter.restaurantName}
        data={{
          address: post.frontmatter.address,
          phoneNumber: post.frontmatter.phoneNumber,
          onlineOrderLink: post.frontmatter.onlineOrderLink
        }}
        menuItems={post.frontmatter.menuItems}
      />
    </Layout>
  );
};

StoreListing.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default StoreListing;

export const pageQuery = graphql`
  query StoreListingByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        restaurantName
        address
        phoneNumber
        email
        onlineOrderLink
        tags
        menuItems {
          name
          price
        }
      }
    }
  }
`;
