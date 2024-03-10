import request from "supertest";
import app from "../src/index";

describe("GET /pogs", () => {
  it("should return a list of pogs if they exist", async () => {
    const response = await request(app).get("/pogs");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
  });

  it("should return 404 if no pogs are found", async () => {
    const response = await request(app).get("/pogs");
    expect(response.status).toBe(404);
    expect(response.text).toBe("pogs not found");
  });
});

describe("GET /pogs/:id", () => {
  it("should return the pog with the specified id if it exists", async () => {
    const response = await request(app).get("/pogs/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].pogs_id).toBe(1);
  });

  it("should return 404 if the pog with the specified id does not exist", async () => {
    const response = await request(app).get("/pogs/999");
    expect(response.status).toBe(404);
    expect(response.text).toBe("pogs not found");
  });
});

describe("POST /pogs", () => {
  it("should create a new pog", async () => {
    const newPog = {
      pogs_name: "New Pog",
      ticker_symbol: "NP",
      price: 10,
      color: "red",
    };
    const response = await request(app).post("/pogs").send(newPog);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  it("should return 422 if required fields are missing", async () => {
    const incompletePog = {
      ticker_symbol: "NP",
      price: 10,
      color: "red",
    };
    const response = await request(app).post("/pogs").send(incompletePog);
    expect(response.status).toBe(422);
  });
});

describe("PUT /pogs/:id", () => {
  it("should update an existing pog", async () => {
    const updatedPog = {
      pogs_name: "Updated Pog",
      ticker_symbol: "UP",
      price: 15,
      color: "blue",
    };
    const response = await request(app).put("/pogs/1").send(updatedPog);
    expect(response.status).toBe(200);
  });

  it("should return 404 if the pog does not exist", async () => {
    const updatedPog = {
      pogs_name: "Updated Pog",
      ticker_symbol: "UP",
      price: 15,
      color: "blue",
    };
    const response = await request(app).put("/pogs/999").send(updatedPog);
    expect(response.status).toBe(404);
  });
});

describe("DELETE /pogs/:id", () => {
  it("should delete an existing pog", async () => {
    const response = await request(app).delete("/pogs/1");
    expect(response.status).toBe(200);
    expect(response.text).toBe("Deleted");
  });

  it("should return 404 if the pog does not exist", async () => {
    const response = await request(app).delete("/pogs/999");
    expect(response.status).toBe(404);
  });
});
