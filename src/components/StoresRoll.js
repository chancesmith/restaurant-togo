import React from "react";
import PropTypes from "prop-types";
import { Link, graphql, StaticQuery } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

class StoresRoll extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <div className="columns is-multiline">
        {console.log({ posts })}
        {posts &&
          posts.map(({ node: post }) => (
            <div className="is-parent column is-6" key={post.id}>
              <article
                className={`blog-list-item tile is-child box notification`}
              >
                <header>
                  <p className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={post.fields.slug}
                    >
                      {post.frontmatter.restaurantName}
                    </Link>
                    <span> &bull; </span>
                    <span className="subtitle is-size-5 is-block">
                      {post.frontmatter.tags.join(", ")}
                    </span>
                  </p>
                </header>
                <p>
                  {post.excerpt}
                  <br />
                  <br />
                  <Link className="button" to={post.fields.slug}>
                    View Details →
                  </Link>
                </p>
              </article>
            </div>
          ))}
      </div>
    );
  }
}

StoresRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query StoresRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "store-listing" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                restaurantName
                date(formatString: "MMMM DD, YYYY")
                tags
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <StoresRoll data={data} count={count} />}
  />
);
