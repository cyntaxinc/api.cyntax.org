module.exports = mongoose => {
    const Contact = mongoose.model(
      "contact",
      mongoose.Schema(
        {
            source: String,
            name: String,
            first: String,
            last: String,
            phone: String,
            email: String,
            service: String,
            message: String
        },
        { timestamps: true }
      )
    );
    return Contact;
  };